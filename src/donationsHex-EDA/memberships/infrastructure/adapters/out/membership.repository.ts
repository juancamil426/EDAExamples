import { Logger } from '@nestjs/common';
import { MembershipRepositoryPort } from 'src/donationsHex-EDA/memberships/application/ports/out/membership-repository-port';
import { Membership } from 'src/donationsHex-EDA/memberships/domain/entities/membership.entity';

export class MembershipRepository implements MembershipRepositoryPort {
  private readonly logger = new Logger(MembershipRepository.name);

  save(membership: Membership): void {
    this.logger.debug(`Saving membership ${membership.id}`);
  }
}
