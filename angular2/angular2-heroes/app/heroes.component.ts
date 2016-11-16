import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {Hero} from './hero';
import {HeroService} from './hero.service';
// import {HeroDetailComponent} from './hero-detail.component';


@Component({
	
	selector:"my-heroes",
	// 双大括号”会告诉应用：从组件中读取 title 和 hero 属性，并且渲染它们。这就是单向数据绑定的“插值表达式”形式。
	template:`
		<h1>My heroes</h1>
		<ul class="heroes">
			<li *ngFor = "let hero of heroes" (click)="onSelect(hero)" [class.selected]="hero===selectedHero">
				<span class="badge">{{hero.id}}</span>{{hero.name}}
			</li>
		</ul>
		<my-hero-detail [hero]="selectedHero" ></my-hero-detail>
	`,
	styles:[`
		.selected {
		    background-color: #CFD8DC !important;
		    color: white;
		  }
		  .heroes {
		    margin: 0 0 2em 0;
		    list-style-type: none;
		    padding: 0;
		    width: 15em;
		  }
		  .heroes li {
		    cursor: pointer;
		    position: relative;
		    left: 0;
		    background-color: #EEE;
		    margin: .5em;
		    padding: .3em 0;
		    height: 1.6em;
		    border-radius: 4px;
		  }
		  .heroes li.selected:hover {
		    background-color: #BBD8DC !important;
		    color: white;
		  }
		  .heroes li:hover {
		    color: #607D8B;
		    background-color: #DDD;
		    left: .1em;
		  }
		  .heroes .text {
		    position: relative;
		    top: -3px;
		  }
		  .heroes .badge {
		    display: inline-block;
		    font-size: small;
		    color: white;
		    padding: 0.8em 0.7em 0 0.7em;
		    background-color: #607D8B;
		    line-height: 1em;
		    position: relative;
		    left: -1px;
		    top: -4px;
		    height: 1.8em;
		    margin-right: .8em;
		    border-radius: 4px 0 0 4px;
		  }

	`],
	// providers:[HeroService]

})

// export class HeroesComponent{
// 	constructor(private heroService:HeroService){}
// 	title='Tour of Heroes';
// 	// heroes = HEROES;
// 	heroes: Hero[];
// 	getHeroes():void{
// 		// this.heroes = this.heroService.getHeroes();
// 		this.heroService.getHeroes().then(heroes=>this.heroes)
// 	}
// 	selectedHero:Hero;
// 	onSelect(hero:Hero):void{
// 		this.selectedHero = hero;
// 	}
// }
export class HeroesComponent implements OnInit{
	
	heroes:Hero[];
	selectedHero:Hero;
	constructor(private heroService:HeroService){}
	getHeroes():void{
		this.heroService.getHeroes().then(heroes=>this.heroes=heroes);
	}
	ngOnInit():void{
		this.getHeroes();
	}
	onSelect(hero:Hero):void{
		this.selectedHero = hero;
	}
}
