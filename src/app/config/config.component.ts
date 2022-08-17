import { Component, OnInit } from '@angular/core';
import { ConfigService } from './config.service';
import { Config } from './config.service';

import { map } from 'rxjs';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: []
})
export class ConfigComponent implements OnInit {

  error: any;
  headers: string[] = [];
  config: Config | undefined;


  constructor(private configService: ConfigService) { }

  ngOnInit(): void {
  }




  showConfig() {
    this.configService.getConfig()
      // clone the data object, using its known Config shape
      .subscribe((data: Config) => this.config = { ...data });
  }

  showConfigResponse() {
    this.configService.getConfigResponse()
      // resp is of type `HttpResponse<Config>`
      .subscribe(resp => {
        // display its headers
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);

        // access the body directly, which is typed as `Config`.
        this.config = { ...resp.body! };
      });
  }



}
