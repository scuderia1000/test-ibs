package valentin.ershov.constants;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Valek on 03.10.2017.
 */
public enum ToWhom {
    WILL_SMITH("Вилл Смит"),
    ANNA_PERKS("Анна Перкс"),
    DAVID_GROHL("Дэвид Грол"),
    STIVEN_JOBS("Стив Джобс"),
    BILL_GATES("Билл Гейтс");

    private String name;

    ToWhom(String name) {
        this.name = name;
    }

    public ToWhom getByName(String name) {
        return Arrays.stream(ToWhom.values()).filter(s -> s.name.equals(name)).findFirst().orElse(null);
    }

    public static List<String> getNames() {
        return Arrays.stream(ToWhom.values()).map(s -> s.name).collect(Collectors.toList());
    }
}
