package valentin.ershov.constants;

import java.util.Arrays;

/**
 * Created by Valek on 03.10.2017.
 */
public enum Status {
    CREATED("Создана"),
    UPDATED("Обновлена");

    private String name;

    Status(String name) {
        this.name = name;
    }

    public Status getByName(String name) {
        return Arrays.stream(Status.values()).filter(s -> s.name.equals(name)).findFirst().orElse(null);
    }
}
