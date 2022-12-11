import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class HttpServiceService {
    constructor(private http: HttpClient) {}

    getUsers() {
        return this.http.get(
            'https://human-tech-hackaton-22.vercel.app/api/face-users'
        );
    }

    addUser() {
        return this.http.post(
            'https://human-tech-hackaton-22.vercel.app/api/face-users',
            { usersChange: 1 }
        );
    }

    removeUser() {
        this.http
            .post('https://human-tech-hackaton-22.vercel.app/api/face-users', {
                usersChange: -1,
            })
            .subscribe();
    }

    getUserMood(): Observable<any> {
        return this.http.get(
            'https://human-tech-hackaton-22.vercel.app/api/face-mood'
        );
    }

    addHappyUser() {
        return this.http.post(
            'https://human-tech-hackaton-22.vercel.app/api/face-mood',
            {
                moodChange: 1,
            }
        );
    }

    addSadUser() {
        return this.http.post(
            'https://human-tech-hackaton-22.vercel.app/api/face-mood',
            {
                moodChange: -1,
            }
        );
    }
}
