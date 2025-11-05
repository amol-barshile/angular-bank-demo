import { CommonModule } from '@angular/common'
import { Component, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Product } from '../../models/product.model'
import { ModalComponent } from '../../shared/services/components/modal-component'
import { ProductService } from '../../shared/services/product.service'

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ModalComponent, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  @ViewChild('productModal') productModal!: ModalComponent
  @ViewChild('deleteModal') deleteModal!: ModalComponent
  products: Product[] = [];
  addProductForm!: FormGroup
  productId: number | undefined

  constructor(private productService: ProductService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.addProductForm = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
    })
    this.getProductList()
  }

  get name() {
    return this.addProductForm.get('name')!
  }

  get price() {
    return this.addProductForm.get('price')!
  }

  get description() {
    return this.addProductForm.get('description')!
  }

  openAddProductModal() {
    this.productModal.open()
    // this.router.navigateByUrl('/add-product')
  }

  getProductList() {
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        console.log(response)
        this.products = response
      },
      error: (error) => {
        console.error('fetching data failed', error)
      },
    })
  }

  editProduct(product: any) {
    console.log(product)
  }

  openDeleteProductModal(productId: number) {
    this.productId = productId
    this.deleteModal.open()
  }

  deleteProduct() {
    this.productService.deleteProductById(this.productId).subscribe({
      next: (response) => {
        this.deleteModal.close()
      },
      error: (error) => {
        console.error('product deletion failed', error)
      },
    })
  }

  viewProduct(productId: any) {
    console.log(productId)
  }

  onSubmit() {
    console.log('onSubmit')
    if (this.addProductForm.valid) {
      this.productService.addProduct(this.addProductForm.value).subscribe({
        next: (response) => {
          this.getProductList()
          this.productModal.close()
        },
        error: (error) => {
          console.error('New Product addition failed', error)
        },
      })
      this.addProductForm.reset()
    } else {
      this.addProductForm.markAllAsTouched()
    }
  }
}
