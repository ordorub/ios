import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  @ViewChild('camera') protected camera?: NgxScannerQrcodeComponent;

  constructor(private http: HttpClient) { }

  ngAfterViewInit() {
    // this.camera?.start and this.http.get workы separately, but together they give an error
    const playDeviceFacingBack = (devices: any[]) => {
      // front camera or back camera check here!
      const device = devices.find(f => (/back|rear|environment|зад/gi.test(f.label))); // Default Back Facing Camera
      this.camera?.playDevice(device ? device.deviceId : devices[0].deviceId);
    }
    this.camera?.start(playDeviceFacingBack).subscribe((r: any) => console.log(r), alert);

    this.http.get<string>(`https://192.168.1.42:7094/Shifts/GetServerTime`).subscribe();
  }

  ngOnDestroy() {
    this.camera?.stop();
    this.camera?.ngOnDestroy();
    this.camera = undefined;
  }
}
