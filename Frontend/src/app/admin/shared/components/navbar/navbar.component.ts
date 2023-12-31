import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Admin } from 'src/app/shared/models/Admin.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private adminService: AdminService , private router : Router) {}
  admin!: Admin;
  ngOnInit(): void {
    this.adminService.getCurrentAdmin().subscribe((response) => {
      this.admin = response.data;
    });
  }
  handleLogout() {
    this.adminService.logout()
    this.router.navigateByUrl('/login/admin')
  }
}
