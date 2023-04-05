import { injectable, inject } from 'tsyringe';

interface Request {
    user_id: string;
    month: number;
    year: number;
}

type Response = Array<{
    day: number;
    available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
    constructor(
    ) {}

    public async execute({ user_id, month, year }: Request): Promise<Response> {
        return [{ day: 1, available: false}];
    }
}

export default ListProviderMonthAvailabilityService;
