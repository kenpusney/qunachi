export default class VisitHistory {
    public place: string;
    public time: Date;

    constructor(place: string, time: Date) {
        this.place = place;
        this.time = time;
    }
}
