import { getRepository } from 'typeorm';
import { User } from '../model/User';
import { TeamMembership } from '../model/TeamMembership';

export async function getTeamsForUser(user: User) {
  await getRepository(TeamMembership)
    .createQueryBuilder('teamMembership')
    .leftJoinAndSelect('teamMembership.team', 'team')
    .where('teamMembership.userId = :userId', { userId: user.id })
    .getMany();
}
