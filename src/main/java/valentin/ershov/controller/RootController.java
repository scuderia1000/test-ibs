package valentin.ershov.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import valentin.ershov.constants.FromWhom;
import valentin.ershov.constants.Status;
import valentin.ershov.constants.ToWhom;
import valentin.ershov.entity.User;
import valentin.ershov.service.UserService;

import java.util.Arrays;
import java.util.List;

/**
 * Created by Valek on 29.09.2017.
 */
@RestController
@RequestMapping(value = "api/")
public class RootController {

    @Autowired
    private UserService userService;

    /*@RequestMapping(value = "/")
    public String index() {
        return "index";
    }*/

    @RequestMapping(value = "create", method = RequestMethod.POST)
    @ResponseBody
    public String create() {
        System.out.println("New ticket saved");
        return "New ticket saved";
    }

    @RequestMapping(value = "getCombo/toWhom", method = RequestMethod.GET)
    public List<ToWhom> getAllToWhom() {
        List<ToWhom> toWhoms = Arrays.asList(ToWhom.values());
        System.out.println("Get To Whom combobox");
        return toWhoms;
    }

    @RequestMapping(value = "getCombo/fromWhom", method = RequestMethod.GET)
    public List<FromWhom> getAllFromWhom() {
        List<FromWhom> fromWhoms = Arrays.asList(FromWhom.values());
        System.out.println("Get From Whom combobox");
        return fromWhoms;
    }

    @RequestMapping(value = "getCombo/status", method = RequestMethod.GET)
    public List<Status> getAllStatus() {
        List<Status> statuses = Arrays.asList(Status.values());
        System.out.println("Get Status combobox");
        return statuses;
    }

    @RequestMapping(value = "delete", method = RequestMethod.GET)
    @ResponseBody
    public String deleteUser(long id) {
        /*try {
            userService.deleteById(id);
        } catch (Exception e) {
            return "Error user deleting" + e.toString();
        }*/
        System.out.println(String.format("Deleting ticket with id: %d", id));
        return "User deleted successfully";
    }
}
