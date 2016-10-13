import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {backendServerUrl} from "../globals";
import {SearchRouteSentData} from "../classes/SearchRouteSentData";

@Injectable()
export class SearchRouteMainService {
    private searchRouteMainUrl: string;

    constructor(private _http: Http) {
    }

    getRoutes(params: SearchRouteSentData[]) {
        this.searchRouteMainUrl = backendServerUrl + '/routes/'
        return this._http.post(this.searchRouteMainUrl, params)
            .map(res => res.json());
    }
}