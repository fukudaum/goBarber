import { injectable, inject } from 'tsyringe';

interface Request {
    user_id: string;
    month: number;
    year: number;
}

@injectable()
class ListProviderMonthAvailabilityService {
    constructor(
    ) {}

    public async execute({ user_id, month, year }: Request): Promise<void> {

    }
}

export default ListProviderMonthAvailabilityService;
