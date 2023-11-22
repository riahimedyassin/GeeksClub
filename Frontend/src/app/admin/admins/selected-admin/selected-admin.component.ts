import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../shared/services/admin.service';
import { Admin } from 'src/app/shared/models/Admin.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-selected-admin',
  templateUrl: './selected-admin.component.html',
  styleUrls: ['./selected-admin.component.scss'],
})
export class SelectedAdminComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private activated: ActivatedRoute,
    private router: Router
  ) {}
  admin!: Admin;
  id!: string;
  deleted: boolean = false;
  ngOnInit(): void {
    this.id = <string>this.activated.snapshot.paramMap.get('id');
    this.adminService.getSingleAdmin(this.id).subscribe((response) => {
      this.admin = response.data;
    });
  }
  handleDelete() {
    this.adminService.deleteAdmin(this.id).subscribe((response) => {
      this.deleted = true;
      setTimeout(() => {
        this.router.navigateByUrl('/admin/admins/list');
      }, 3000);
    });
  }
}
