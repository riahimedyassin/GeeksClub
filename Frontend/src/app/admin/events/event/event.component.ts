import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/dashboard/shared/services/user/user.service';
import { EventsService } from 'src/app/services/events/events.service';
import { Event } from 'src/app/shared/models/Event.model';
import { User } from 'src/app/shared/models/User.model';
import { CustomValidator } from 'src/app/shared/validators/CustomValidator';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  event!: Event;
  participants!: User[];
  id!: string;
  edit: boolean = false;
  form!: FormGroup;
  saved: boolean= false ; 
  constructor(
    private eventService: EventsService,
    private activated: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router : Router
  ) {}
  ngOnInit(): void {
    this.id = <string>this.activated.snapshot.paramMap.get('id');
    this.eventService.getSingleEvent(this.id).subscribe((response) => {
      this.event = response.data;
      this.form = this.formBuilder.nonNullable.group({
        title: [response.data.title,[Validators.required,CustomValidator.strings]],
        descreption: [response.data.descreption,[Validators.required,CustomValidator.strings]],
        price: [response.data.price,[Validators.required, CustomValidator.numeric]],
        reward_point: [response.data.reward_point,[Validators.required,CustomValidator.numeric]],
        date: this.formBuilder.group({
          date_start: [response.data.date.date_start,[Validators.required]],
          date_end: [response.data.date.date_end,[Validators.required]],
        }),
        ended: [response.data.ended,[Validators.required]],
        prerequis: this.formBuilder.nonNullable.array(response.data.prerequis),
        categorie: [response.data.categorie,[Validators.required]],
      });
      this.form.disable()
      this.eventService.getParticipants(this.id).subscribe((response) => {
        this.participants = response.data;
      });
    });
    

  }
  get listPrerequis() {
    return this.form.controls['prerequis'] as FormArray
  } 
  confirmParticipation(userID: string) {
    this.eventService
      .confirmParticipation(this.id, userID)
      .subscribe((response) => {
        this.saved=true ; 
        setTimeout(()=> {
          this.saved=false ; 
        },3000)
      });
  }
  handleEdit() {
    this.edit = !this.edit;
    this.edit ? this.form.enable() : this.form.disable()
  }
  handleSave() {
    this.form
      .get('ended')
      ?.setValue(this.form.get('ended')?.value === 'true' ? true : false);
    this.eventService
      .editEvent(this.id, this.form.value)
      .subscribe((response) => {
        this.event = this.form.value;
        this.edit=false;
        this.saved=true ; 
        setTimeout(()=>this.saved=false , 3000)
      });
  }
  handleDelete() {
    this.eventService.deleteEvent(this.id).subscribe(response=> {
      this.router.navigateByUrl('/admin/events') 
    })
  }
  handleEndEvent() {
    this.eventService.endEvent(this.id).subscribe(response => {
      this.event.ended=true ; 
    })
  }

}
