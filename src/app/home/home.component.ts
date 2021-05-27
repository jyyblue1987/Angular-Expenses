import { Component, OnInit } from '@angular/core';

interface Expenses {
	id: number,
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
	input_budget: number = 100;
	total_budget: number = 100.00;
	selected: Expenses = {
		id: 0,
		expense: '',
		cost: 0,
		priority: 'High',
		desired: 0,
		actual: 0
	}

	expenses: Expenses[] = [
		{
			id: 1,
			expense: 'Food',
			cost: 40,
			priority: 'High',
			desired: 30,
			actual: 40
		},
		
		{
			id: 2,
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

	onUpdateBudget(budget: number): void {
		this.total_budget = budget;
		this.calcuateActual();
	}

	calcuateActual(): void {
		this.expenses.forEach((item: Expenses) => {
			item.actual = item.cost * 100 / this.total_budget;
		});
	}

	onSelect(row: Expenses): void {
		this.selected = Object.assign({}, row);
	}

	onDelete(row: Expenses): void {
		this.expenses = this.expenses.filter((item: Expenses) => item.id != row.id);
	}

	onUpdate(): void {
		// check validate
		if( !this.selected.expense )
			return;

		if( this.selected.cost < 1 )
			return;
		
		if( this.selected.desired < 1 )
			return;

		if( this.selected.id < 1 ) // create
		{
			// find max id
			let max_id = 0;
			this.expenses.forEach((item: Expenses) => {
				if( item.id > max_id )
					max_id = item.id;
			});

			let model: Expenses = {
				id: max_id + 1,
				expense: this.selected.expense,
				cost: this.selected.cost,
				priority: this.selected.priority,
				desired: this.selected.desired,
				actual: 0
			};

			this.expenses.push(model);

			this.calcuateActual();
			
			return;
		}

		let model = this.expenses.find((item: Expenses) => this.selected.id == item.id);

		if( !model )
			return;

		model.expense = this.selected.expense;
		model.cost = this.selected.cost;
		model.priority = this.selected.priority;
		model.desired = this.selected.desired;

		this.calcuateActual();
		this.onCancel();
	}

	onCancel(): void {
		this.selected = {
			id: 0,
			expense: '',
			cost: 0,
			priority: 'High',
			desired: 0,
			actual: 0
		}
	}

}
