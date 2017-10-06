package valentin.ershov.constants;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Valek on 03.10.2017.
 */
public enum Status {
    CREATED("Создана"),
    UPDATED("Обновлена"),
    WORKING("В работе"),
    CONFIRMED("Подтверждена");

    private String name;

    Status(String name) {
        this.name = name;
    }

    public Status getByName(String name) {
        return Arrays.stream(Status.values()).filter(s -> s.name.equals(name)).findFirst().orElse(null);
    }

    public static List<String> getNames() {
        return Arrays.stream(Status.values()).map(s -> s.name).collect(Collectors.toList());
    }
}
