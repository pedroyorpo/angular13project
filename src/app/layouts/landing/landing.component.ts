import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ModulesService } from 'src/app/services/Users/modules.service';
import { SubModulesService } from 'src/app/services/Users/sub-modules.service';
import { _systemTitle } from 'src/global-variables';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  Modules : any = [];
  SubModules : any = [];
  constructor(
    private modulesService : ModulesService,
    private subModulesService : SubModulesService,
    public router            : Router,
  ) { }
  systemTitle : string = _systemTitle;
  ngOnInit(): void {
    this.GetMenus();
  }

  async GetMenus(){
    this.Modules = await firstValueFrom(this.modulesService.GetModules());
    this.SubModules = await firstValueFrom(this.subModulesService.GetSubModules());
  //  console.log(this.SubModules);
  }

  getPath(module:string){
    module        =  module.replace(' ', '');
    module        =  module.replace(' ', '');
      
    var data:string   = this.router.url;
    var data2:any     = (data.split('/'));
    let route         = data2[data2.length - 2].replace(/[^\w\s]/gi, '');
    var route2        = route.replace(/[0-9]/g, '');

    return route2 == module;
  }




}
