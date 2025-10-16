import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateDonationPort } from '../../../application/ports/in/create-donation.port';

@Controller('donations')
export class DonationsController {
  constructor(
    @Inject('CreateDonationPort')
    private readonly createDonationPort: CreateDonationPort,
  ) {}

  @Post()
  async create(@Body() body: { userId: string; amount: number }) {
    return this.createDonationPort.createDonation(body);
  }
}
