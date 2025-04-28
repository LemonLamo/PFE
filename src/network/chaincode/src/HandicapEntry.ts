import {Object, Property} from 'fabric-contract-api';

@Object()
export class HandicapEntry {
    @Property()
    public ID: string;

    @Property()
    public NIN: string;

    @Property()
    public code_handicap: string;

    @Property()
    public doctor: string;

    @Property()
    public Travail: string;

    @Property()
    public Solidarity: string;

    @Property()
    public TimestampTravail: string;

    @Property()
    public TimestampSolidarity: string;
}