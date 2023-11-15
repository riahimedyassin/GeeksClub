import { Component, OnInit } from '@angular/core';
import { Forum } from 'src/app/shared/models/Forum.model';
import { ForumsService } from '../shared/services/forum/forums.service';
import { UserService } from '../shared/services/user/user.service';

@Component({
  selector: 'app-forums',
  templateUrl: './forums.component.html',
  styleUrls: ['./forums.component.scss'],
})
export class ForumsComponent  {}
