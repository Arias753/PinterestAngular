import { NgModule } from '@angular/core';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatTooltipModule, MatButtonModule, MatDialogModule, MatTabsModule } from '@angular/material';

@NgModule({
    imports: [
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatTooltipModule,
        MatButtonModule,
        MatDialogModule,
        MatTabsModule
    ],
    exports: [
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatTooltipModule,
        MatButtonModule,
        MatDialogModule,
        MatTabsModule
    ],
})
export class MaterialModule { }