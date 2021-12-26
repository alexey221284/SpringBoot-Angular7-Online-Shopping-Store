import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {ProductInfo} from '../../models/productInfo';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Categories} from 'src/app/models';

@Component({
    selector: 'app-product-edit',
    templateUrl: './product-edit.component.html',
    styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit, AfterContentChecked {

    product = new ProductInfo();
    options$: Observable<Categories>;

    constructor(
      private productService: ProductService,
      private route: ActivatedRoute,
      private router: Router
    ) {
      this.options$ = this.getOptions();
      console.log(this.options$);
    }

    productId: string;
    isEdit = false;

    ngOnInit() {
        this.productId = this.route.snapshot.paramMap.get('id');
        if (this.productId) {
            this.isEdit = true;
            this.productService.getDetail(this.productId).subscribe(prod => this.product = prod);
        }

    }

    update() {
        this.productService.update(this.product).subscribe(prod => {
                if (!prod) throw new Error();
                this.router.navigate(['/seller']);
            },
            err => {
            });

    }

    onSubmit() {
        if (this.productId) {
            this.update();
        } else {
            this.add();
        }
    }

    add() {
        this.productService.create(this.product).subscribe(prod => {
                if (!prod) throw new Error;
                this.router.navigate(['/']);
            },
            e => {
            });
    }

    ngAfterContentChecked(): void {
        console.log(this.product);
    }

    getOptions(): Observable<Categories> {
      return this.productService.getAllCategories();
    }
}
