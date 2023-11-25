import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../shared/services/admin.service';
import { Admin } from 'src/app/shared/models/Admin.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-admins',
  templateUrl: './list-admins.component.html',
  styleUrls: ['./list-admins.component.scss'],
})
export class ListAdminsComponent implements OnInit {
  constructor(private adminService: AdminService ,private  activated : ActivatedRoute  , private router : Router) {}
  current!: Admin;
  admins!: Admin[];
  ngOnInit(): void {
    this.current = this.activated.snapshot.data['isSup']
    this.adminService.getAllAdmins().subscribe((response) => {
      this.admins = response.data;
    });
  }
  handleDelete(id : string ) {
    this.router.navigateByUrl(`/admin/admins/${id}`)
  }
}
