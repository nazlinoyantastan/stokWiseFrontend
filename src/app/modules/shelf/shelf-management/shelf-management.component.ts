import { Component, OnInit } from '@angular/core';
import { Shelf } from '../../../shared/dto/shelf';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../shared/service/product.service';
import { ToastrService } from 'ngx-toastr';
import { ShelfService } from '../../../shared/service/shelf.service';

@Component({
  selector: 'app-shelf-management',
  templateUrl: './shelf-management.component.html',
  styleUrl: './shelf-management.component.scss'
})
//ngOnInit() ?
export class ShelfManagementComponent implements OnInit {

  shelves : Shelf[] = [];
  selectedShelf: Shelf | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
     private shelfService: ShelfService,
     private toastr: ToastrService
  ) { }

  //Component çağrıldığında çalışan method.
  ngOnInit(): void {
    this.shelfService.getAllShelves().subscribe({
      next: (data => {
        this.shelves = data;
    console.log(this.shelves);
      })
    });
  }
  
  addShelf(){
    this.router.navigate(['addShelf'], { relativeTo: this.route });
  }

  selectBox(shelf: Shelf) {
    if (shelf == this.selectedShelf) {
      this.selectedShelf = null;
    } else {
      this.selectedShelf = shelf;
    }
  }

  editShelf(shelf : Shelf) {
    this.shelfService.editingShelf = shelf;
    console.log(shelf);
    this.router.navigate(['editShelf'], { relativeTo: this.route });
  }
  
  deleteShelf(shelf: Shelf) {
    console.log(shelf.id);
    this.shelfService.deleteShelf(shelf.id).subscribe({
      next: () => {
        this.shelves = this.shelves.filter(s => s.id!== shelf.id);
        this.toastr.success("Shelf deleted successfully");
        console.log(this.shelves);
      },
      error: (err)=> {
        console.log(err);
      }
    })
  }

}
