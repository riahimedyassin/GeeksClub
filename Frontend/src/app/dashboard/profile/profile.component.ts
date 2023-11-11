import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/dashboard/shared/services/user/user.service';
import { User } from 'src/app/shared/models/User.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
   user! :User ;
   form! : FormGroup; 
   constructor(private userService : UserService, private formbuilder : FormBuilder) {
   }
   ngOnInit(): void {
       this.userService.getCurrentUser().subscribe(response=> {
            this.user=response.data
            this.form=this.formbuilder.group({
              name:[this.user.name],
              forname : this.user.forname,
              age : this.user.age ,
              email : this.user.email ,
              address : this.formbuilder.group({
                city : this.user.address.city,
                region : this.user.address.region
              })
            })
            console.log(this.form)
       })

   }

}
