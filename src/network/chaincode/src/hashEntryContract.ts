/*
 * SPDX-License-Identifier: Apache-2.0
 */
// Deterministic JSON.stringify()
import {Context, Contract, Info, Returns, Transaction} from 'fabric-contract-api';
import stringify from 'json-stringify-deterministic';
import sortKeysRecursive from 'sort-keys-recursive';
import { HashEntry } from './hashEntry';

@Info({title: 'HashEntry', description: 'Smart contract for saving hashes'})
export class HashEntryContract extends Contract {

    @Transaction()
    public async InitLedger(ctx: Context): Promise<void> {
        console.info(`Ledger is initialised`);
    }

    // GetAllAssets returns all assets found in the world state.
    @Transaction(false)
    @Returns('string')
    public async GetAll(ctx: Context): Promise<string> {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push(record);
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }

    @Transaction(false)
    @Returns('string')
    public async GetOne(ctx: Context, ID: string): Promise<string> {
        const assetJSON = await ctx.stub.getState(ID);
        if (!assetJSON || assetJSON.length === 0) {
            throw new Error(`The asset ${ID} does not exist`);
        }
        return assetJSON.toString();
    }

    @Transaction(false)
    @Returns('boolean')
    public async EntryExists(ctx: Context, ID: string): Promise<boolean> {
        const assetJSON = await ctx.stub.getState(ID);
        return assetJSON && assetJSON.length > 0;
    }

    // AddEntry associates a hash to 'ID' and saves it to the world state.
    @Transaction()
    public async AddEntry(ctx: Context, ID: string, hash: string, author: string, timestamp: string): Promise<void> {
        const exists = await this.EntryExists(ctx, ID);
        if (exists)
            throw new Error(`The hash for ${ID} already exists`);

        const entry : HashEntry = { ID, hash, author, timestamp };
        await ctx.stub.putState(ID, Buffer.from(stringify(sortKeysRecursive(entry))));
    }
}
