import {
  Component,
  ViewChild
} from '@angular/core';
import {
  NavController,
  NavParams,
  Slides,
  ToastController,
  Content
} from 'ionic-angular';
import {
  ItemDetailsPage
} from '../item-details/item-details';
import {
  Item
} from '../../models/Item'

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
  items: Array < Item > ;
  @ViewChild(Slides)
  slides: Slides;
  page: number = 1;
  @ViewChild(Content)
  content: Content;
  private lastScrollTop: number = 0;
  private scrollDirection: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController) {
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
      'american-football', 'boat', 'bluetooth', 'build'
    ];
    this.items = [];


  }
  ngOnInit() {
    this.items = this.populateItems(this.page);

  }
  ngAfterViewInit() {

    this.content.ionScrollEnd.subscribe((data) => {
      console.log("Scroll top "+data.scrollTop);
      let t = data.scrollTop;
      if (t > this.lastScrollTop) {
        this.scrollDirection = 'down';
      } else if (t < this.lastScrollTop) {
        this.scrollDirection = 'up';
      }
      this.lastScrollTop = t;
      console.log("After setting direction "+ this.scrollDirection);
    });
  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }

  doInfinite(event) {
    console.log(event);
    
      setTimeout(() => {
        var l = this.populateItems(this.page);

        if (l == null) {
          //show toast
          if (this.scrollDirection == 'down') {
          this.showToast();
          }
        } else {
          this.items = this.items.concat(l);
        }
        event.complete();
      }, 500);
    
  }

  showToast() {
    let toast = this.toastCtrl.create({
      message: "No More products to show",
      duration: 3000,
      position: 'bottom',
      showCloseButton: true
    });
    toast.present();
  }

  populateItems(page) {
    console.log("Page :" + page);
    if (page > 3) {
      return null;
    } else {

      var startIndex = (page - 1) * 10;
      console.log("Page Start : " + startIndex);
      var endIndex = startIndex + 10;
      var list = [];
      for (var i = startIndex + 1; i <= endIndex; i++) {
        var item: Item = {
          title: 'Item ' + i,
          note: 'This is item #' + i,
          icon: this.icons[Math.floor(Math.random() * this.icons.length)],
          price: Math.floor(Math.random()*10000) + i,
          image: "https://homepages.cae.wisc.edu/~ece533/images/pool.png"

        };
        //this.items.push(item);
        list.push(item);
      }
      this.page++;
      return list;
    }

  }
}

