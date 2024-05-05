import {Object, Property} from 'fabric-contract-api';

@Object()
export class HashEntry {
    @Property()
    public ID: string;

    @Property()
    public hash: string;

    @Property()
    public author: string;

    @Property()
    public timestamp: string;
}
