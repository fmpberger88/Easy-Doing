import { describe, it, expect, vi, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import projectModule from '../../modules/projectModule.js';
import showProjects from "../../utils/showProjects.js";

describe('showProjects', () => {
    let dom;
    let document;

    beforeEach(() => {
        dom = new JSDOM('<!DOCTYPE html><html><body><ul id="project-list"></ul></body></html>');
        document = dom.window.document;

        // Mock des projectModule
        vi.spyOn(projectModule, 'getProjects').mockImplementation(() => [
            { title: 'Project 1' },
            { title: 'Project 2' }
        ]);
    });

    it('sollte Projektelemente korrekt zum DOM hinzufügen', () => {
        showProjects(document);  // Übergeben des document Objekts
        console.log(document.body.innerHTML);  // Überprüfen, was aktuell im DOM ist

        const list = document.querySelector('#project-list');
        const items = list.querySelectorAll('li');

        expect(items.length).toBe(2);
        expect(items[0].textContent).toBe('Project 1');
        expect(items[1].textContent).toBe('Project 2');
    });
});
