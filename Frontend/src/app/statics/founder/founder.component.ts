import { Component, OnInit } from '@angular/core';
import { GithubService } from '../services/github.service';

const base = 'assets/Skills';

@Component({
  selector: 'app-founder',
  templateUrl: './founder.component.html',
  styleUrls: ['./founder.component.scss'],
})
export class FounderComponent implements OnInit {
  constructor(private githubService: GithubService) {}
  skills = [
    { path: base + '/angular.jpg', alt: 'Angular', title: 'Angular' },
    { path: base + '/react.png', alt: 'React', title: 'React ' },
    { path: base + '/node.png', alt: 'Node JS', title: 'Node JS' },
    { path: `${base}/figma.png`, alt: 'Figma', title: 'Figma' },
    { path: `${base}/ps.png`, alt: 'Photoshop', title: 'Adobe Photoshop' },
    { path: `${base}/jest.png`, alt: 'Jest', title: 'Jest Testing Library' },
    { path: `${base}/mongo.png`, alt: 'MongoDB', title: 'Mongo Database' },
    { path: `${base}/sass.png`, alt: 'Sass', title: 'SASS/SCSS' },
    { path: `${base}/express.png`, alt: 'Express JS', title: 'Express JS' },
    { path: `${base}/threejs.png`, alt: 'Three JS', title: 'Three JS' },
    {
      path: `${base}/mongoose.png`,
      alt: 'Mongoose',
      title: 'Mongoose Library',
    },
    { path: `${base}/less.png`, alt: 'LESS', title: 'LESS' },
    { path: `${base}/tailwind.png`, alt: 'tailwind', title: 'tailwind' },
  ];
  repos!: any;
  displayRepos : boolean= false ; 
  ngOnInit(): void {
    this.githubService.getReposertries().subscribe((response) => {
      this.repos = response;
    });
  }
}
