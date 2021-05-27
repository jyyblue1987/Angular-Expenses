import { Component, OnInit } from '@angular/core';

interface Expenses {
	expense: string;
	cost: number;
	priority: string;
	desired: number;
	actual: number;
}

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
	total_budget: number = 100.00;

	expenses: Expenses[] = [
		{
			expense: 'Food',
			cost: 40,
			priority: 'High',
			desired: 30,
			actual: 40
		},
		
		{
			expense: 'Netflix',
			cost: 15,
			priority: 'Medium',
			desired: 15,
			actual: 15
		}
	];

	constructor() { }

	ngOnInit(): void {

	}

}
