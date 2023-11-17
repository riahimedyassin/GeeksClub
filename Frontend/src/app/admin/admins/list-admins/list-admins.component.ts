import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../shared/services/admin.service';
import { Admin } from 'src/app/shared/models/Admin.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-admins',
  templateUrl: './list-admins.component.html',
  styleUrls: ['./list-admins.component.scss'],
})
export class ListAdminsComponent implements OnInit {
  constructor(private adminService: AdminService ,private  activated : ActivatedRoute) {}
  authAdd!: boolean;
  admins!: Admin[];
  ngOnInit(): void {
    this.activated.data.subscribe(data=> console.log(data))
    this.authAdd = this.activated.snapshot.data['isSup']
    this.adminService.getAllAdmins().subscribe((response) => {
      this.admins = response.data;
    });
  }
}
