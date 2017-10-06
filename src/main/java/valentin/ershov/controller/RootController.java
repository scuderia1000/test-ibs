package valentin.ershov.controller;

import org.springframework.web.bind.annotation.*;
import valentin.ershov.constants.FromWhom;
import valentin.ershov.constants.Status;
import valentin.ershov.constants.ToWhom;

import java.util.List;

/**
 * Created by Valek on 29.09.2017.
 */
@RestController
@RequestMapping(value = "api/")
public class RootController {

    @RequestMapping(value = "create", method = RequestMethod.POST)
    @ResponseBody
    public String create() {
        System.out.println("New ticket saved");
        return "New ticket saved";
    }

    @RequestMapping(value = "getCombo/toWhom", method = RequestMethod.GET)
    public List<String> getAllToWhom() {
        List<String> toWhoms = ToWhom.getNames();
        System.out.println("Get To Whom combobox");
        return toWhoms;
    }

    @RequestMapping(value = "getCombo/fromWhom", method = RequestMethod.GET)
    public List<String> getAllFromWhom() {
        List<String> fromWhoms = FromWhom.getNames();
        System.out.println("Get From Whom combobox");
        return fromWhoms;
    }

    @RequestMapping(value = "getCombo/status", method = RequestMethod.GET)
    public List<String> getAllStatus() {
        List<String> statusNames = Status.getNames();
        System.out.println("Get Status combobox");
        return statusNames;
    }

    @RequestMapping(value = "delete", method = RequestMethod.GET)
    @ResponseBody
    public String deleteUser(long id) {
        System.out.println(String.format("Deleting ticket with id: %d", id));
        return "User deleted successfully";
    }
}
