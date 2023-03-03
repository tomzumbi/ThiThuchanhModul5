import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {TourService} from "../../service/tour.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id: any;
  editForm: any;
  tour: any;

  constructor(private tourService: TourService, private router: Router, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(paramMap => {
      this.id = paramMap.get('id');
      this.tourService.findById(this.id).subscribe((data) => {
        this.tour = data
        this.editForm = new FormGroup({
          id: new FormControl(data.id),
          title: new FormControl(data.title),
          price: new FormControl(data.price),
          description: new FormControl(data.description),
        })
      })
    })
  }

  ngOnInit(): void {

  }

  edit() {
    this.tourService.updateProduct(this.id, this.editForm.value).subscribe();
    this.router.navigate(["/"]);
  }
}
