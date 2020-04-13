import { Component, OnInit } from '@angular/core';
import {AlertService} from '../shared/components/alert/alert.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
options = {
        autoClose: false,
        keepAfterRouteChange: false
    };
  constructor(private alertService: AlertService) { }

  ngOnInit() {
  }

}
