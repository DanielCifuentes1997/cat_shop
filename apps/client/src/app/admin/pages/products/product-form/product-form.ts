import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="form-container">
      <div class="header">
        <h2>{{ isEditing ? 'Editar Producto' : 'Nuevo Producto' }}</h2>
        <a routerLink="/admin/products" class="btn-secondary">Cancelar</a>
      </div>

      <form [formGroup]="productForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="name">Nombre</label>
          <input id="name" type="text" formControlName="name" />
        </div>

        <div class="form-group">
          <label for="description">Descripción</label>
          <textarea id="description" formControlName="description" rows="4"></textarea>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="price">Precio</label>
            <input id="price" type="number" formControlName="price" />
          </div>

          <div class="form-group">
            <label for="stock">Stock</label>
            <input id="stock" type="number" formControlName="stock" />
          </div>
        </div>

        <div class="form-group">
          <label for="imageUrl">URL de la Imagen</label>
          <input id="imageUrl" type="text" formControlName="imageUrl" />
        </div>

        <div class="preview" *ngIf="productForm.get('imageUrl')?.value">
          <img [src]="productForm.get('imageUrl')?.value" alt="Vista previa" />
        </div>

        <button type="submit" [disabled]="productForm.invalid" class="btn-primary">
          {{ isEditing ? 'Actualizar' : 'Crear Producto' }}
        </button>
      </form>
    </div>
  `,
  styles: [`
    .form-container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .form-group { margin-bottom: 15px; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    label { display: block; margin-bottom: 5px; font-weight: bold; color: #34495e; }
    input, textarea { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 16px; box-sizing: border-box; }
    textarea { resize: vertical; }
    .btn-primary { background: #2ecc71; color: white; border: none; padding: 12px 20px; border-radius: 4px; cursor: pointer; font-size: 16px; width: 100%; }
    .btn-primary:disabled { background: #95a5a6; cursor: not-allowed; }
    .btn-secondary { color: #7f8c8d; text-decoration: none; }
    .preview { margin-top: 10px; text-align: center; }
    .preview img { max-width: 100%; max-height: 200px; border-radius: 4px; }
  `]
})
export class ProductForm implements OnInit {
  private fb = inject(FormBuilder);
  private apiService = inject(ApiService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  productForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    imageUrl: ['', Validators.required]
  });

  isEditing = false;
  productId: string | null = null;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditing = true;
        this.productId = id;
        this.loadProduct(id);
      }
    });
  }

  loadProduct(id: string) {
    this.apiService.getProductById(id).subscribe(product => {
      this.productForm.patchValue({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        imageUrl: product.imageUrl
      });
    });
  }

  onSubmit() {
    if (this.productForm.invalid) return;

    const productData = this.productForm.value;

    if (this.isEditing && this.productId) {
      this.apiService.updateProduct(this.productId, productData).subscribe(() => {
        this.router.navigate(['/admin/products']);
      });
    } else {
      this.apiService.createProduct(productData).subscribe(() => {
        this.router.navigate(['/admin/products']);
      });
    }
  }
}