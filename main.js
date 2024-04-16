import {seedProjects} from "./seed.js";
import projectModule from "./modules/projectModule.js";
import todoModule from "./modules/todoModule.js";
import showProjects from "./utils/showProjects.js";

if (!projectModule.getProjects().length || !todoModule.getTodos().length) {
    seedProjects();
}

showProjects(document);