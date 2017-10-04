package valentin.ershov.constants;

import java.util.Arrays;

/**
 * Created by Valek on 04.10.2017.
 */
public enum FromWhom {

    OZEROV_IVAN("Озеров Иван Христофорович"),
    NEDOLIN_MARTIN("Недолин Мартын Акимович"),
    NIKITIN_ANDREI("Никитин Андрей Афанасьевич"),
    MOSOLOV_ALEKSANDR("Мосолов Александр Николаевич"),
    NAUMOVA_ANNA("Наумова Анна Александровна");

    private String name;

    FromWhom(String name) {
        this.name = name;
    }

    public FromWhom getByName(String name) {
        return Arrays.stream(FromWhom.values()).filter(s -> s.name.equals(name)).findFirst().orElse(null);
    }
}
