import { Transaction, } from 'sequelize';
import { Wallet, } from '../database/models/Wallet';

export class WalletRepository {
	static async createUserWallet(userId: string, balance?: number, transaction?: Transaction): Promise<Wallet> {
		return Wallet.create(
			{
				userId,
				balance,
			},
			{
				transaction,
			}
		);
	}
}
