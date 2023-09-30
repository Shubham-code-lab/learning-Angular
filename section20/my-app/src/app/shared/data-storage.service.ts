import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap,take, exhaustMap } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService, private authService:AuthService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://learning-angular-956f9-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
        recipes
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
    //take only one subject and then unsubscribe
    //exhaustMap will wait for the first observer to completed and we will get value as the user is behavior subject first value will be null
    //after the first observer cis completed it execute the second observer 
    
    return this.authService.user.pipe(   //first observer [behavior subject user]
      take(1),
      exhaustMap(user => {
        return this.http.get<Recipe[]>(    //second observer [Http request]
          'https://learning-angular-956f9-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json'
        )
      }),
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      })
    )
  }

}
