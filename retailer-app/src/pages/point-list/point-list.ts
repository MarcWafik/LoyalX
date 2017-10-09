import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Platform, ViewController } from 'ionic-angular';

import { BrandDetailPage } from '../brand-detail/brand-detail';
import { OfferCreatePage } from '../offer-create/offer-create';
import { PointTransferPage } from '../point-transfer/point-transfer';

import { LoyaltyFactoryProvider } from '../../providers/loyalty-factory/loyalty-factory';
import { LoyaltyTokenProvider } from '../../providers/loyalty-token/loyalty-token';

/**
 * Generated class for the PointListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
	selector: 'page-point-list',
	templateUrl: 'point-list.html',
})
export class PointListPage {
	vouchers: Array<{ price: number, points: number }> = [];
	features: Array<{ name: string, isChecked: boolean }> = [];

	token: any;
	balance: any;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public modalCtrl: ModalController,
		public platform: Platform,
		public viewCtrl: ViewController,
		public loyaltyFactoryProvider: LoyaltyFactoryProvider,
		public loyaltyTokenProvider: LoyaltyTokenProvider
	) {
		this.token = this.navParams.get("token");
		console.log(this.token);
	}

	presentBrandDetail() {
		let BrandDetailModal = this.modalCtrl.create(BrandDetailPage, { token: this.token });
		BrandDetailModal.present();
	}

	presentOfferCreate() {
		let OfferCreateModal = this.modalCtrl.create(OfferCreatePage, { token: this.token });
		OfferCreateModal.present();
	}

	presentPointTransfer() {
		/*let PointTransferPageModal = this.modalCtrl.create(PointTransferPage, { token: this.token });
		PointTransferPageModal.present();*/

		this.navCtrl.push(PointTransferPage, { token: this.token });
	}



	async ionViewDidLoad() {
		let tempBalance = (await this.loyaltyTokenProvider.getBalance(this.token.address));
		this.balance = tempBalance.dividedBy(Math.pow(10, this.token.decimal)).toString(10);
		this.vouchers = [
			{ price: 25, points: 50 },
			{ price: 50, points: 100 },
			{ price: 100, points: 200 },
			{ price: 25, points: 50 }
		];

		this.features = [
			{ name: "Feature 1", isChecked: false },
			{ name: "Feature 2", isChecked: false },
			{ name: "Feature 3", isChecked: false }
		]

	}

}