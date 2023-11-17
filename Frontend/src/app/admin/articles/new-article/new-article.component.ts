import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticlesService } from 'src/app/services/articles/articles.service';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss'],
})
export class NewArticleComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private articleService: ArticlesService
  ) {}
  form!: FormGroup;
  published: boolean = false;
  ngOnInit(): void {
    this.form = this.formBuilder.nonNullable.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }
  handleSubmit() {
    if (this.form.valid && this.form.touched) {
      this.articleService.postArticle(this.form.value).subscribe((response) => {
        this.published = true;
        this.form.reset()
        setTimeout(() => (this.published = false), 3000);
      });
    }
  }
}
