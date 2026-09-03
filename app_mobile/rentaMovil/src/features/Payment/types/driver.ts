import type { DrivingLicenseCategory } from "../../../shared/components/select/DrivingLicenseCategorySelector";

export type DriverData = {

    email:string;

    name:string;

    phone:string;

    licenseCategory?: DrivingLicenseCategory;

    licenseExpirationDate?: Date;

};
