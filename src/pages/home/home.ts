import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams,Slides } from 'ionic-angular';
import { ItemDetailsPage } from '../item-details/item-details';
import { Item } from '../../models/Item'

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  icons: string[];
  items: Array<Item>;
  @ViewChild(Slides)
  slides:Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for(let i = 1; i < 11; i++) {

      var item:Item = {
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)],
        price: 5+i,
        image:"https://homepages.cae.wisc.edu/~ece533/images/pool.png"

      };
      this.items.push(item);
      
    }
  }

  ngAfterViewInit(){
    this.slides.pager = false;
    this.slides.loop = true;
  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }
}