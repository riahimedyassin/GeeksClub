import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from 'src/app/services/articles/articles.service';
import { Article } from 'src/app/shared/models/Article.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  constructor(
    private articleService: ArticlesService,
    private activated: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}
  id!: string;
  article!: Article;
  form!: FormGroup;
  edit: boolean = false;
  updated: boolean = false;
  ngOnInit(): void {
    this.id = <string>this.activated.snapshot.paramMap.get('id');
    this.articleService.getSingleArticle(this.id).subscribe((response) => {
      this.form = this.formBuilder.nonNullable.group({
        title: [response.data.title, [Validators.required]],
        content: [response.data.content, [Validators.required]],
      });
      this.article = response.data;
      this.form.disable();
    });
  }
  handleEdit() {
    this.edit = !this.edit;
    if(this.edit) this.form.enable() 
    else {
      this.form.disable() 
      this.form.reset()
    }
  
  }
  handleSave() {
    if (this.form.valid && this.form.dirty) {
      this.articleService
        .updateArticle(this.id, this.form.value)
        .subscribe((response) => {
          this.updated = true;
          this.edit = false;
          let timeout = setTimeout(() => {
            this.updated = false;
            clearTimeout(timeout);
          }, 3000);
        });
    }
  }
  handleDelete() {
    this.articleService.deleteArticle(this.id).subscribe((response) => {
      this.router.navigateByUrl('/admin/articles');
    });
  }
}
