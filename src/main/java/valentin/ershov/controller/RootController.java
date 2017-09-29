package valentin.ershov.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by Valek on 29.09.2017.
 */
@Controller
public class RootController {

    @RequestMapping(value = "/")
    public String index() {
        return "index.html";
    }
}
