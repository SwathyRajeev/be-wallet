export class DateQueryParams {
  fromDate: string;
  toDate: string;
}


export class CoachSlotParams extends DateQueryParams {
  coach_id: string;
}
