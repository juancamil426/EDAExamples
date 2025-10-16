import { Membership } from 'src/donationsHex-EDA/memberships/domain/entities/membership.entity';

export interface MembershipRepositoryPort {
  save(membership: Membership): void;
}
