import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EventsService } from 'src/app/services/events/events.service';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss'],
})
export class NewEventComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventsService
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.nonNullable.group({
      title: '',
      descreption: '',
      price: 0,
      reward_point: 0,
      date: this.formBuilder.nonNullable.group({
        date_start: '',
        date_end: '',
      }),
      ended: false,
      categorie: 'formation',
      prerequis: this.formBuilder.array([]),
    });
  }
  get listePrerquis() {
    return this.form.controls['prerequis'] as FormArray;
  }
  addPrerequis() {
    this.listePrerquis.push(new FormControl('', [Validators.required]));
  }
  deletePrerequis(index: number) {
    this.listePrerquis.removeAt(index);
  }
  handleSubmit() {
    if (this.form.valid && this.form.touched) {
      this.eventService
        .addNewEvent(this.form.value)
        .subscribe((response) => {
          console.log('Done')
        });
    }
  }
}
