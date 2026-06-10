import { useTheme } from "../../context/ThemeContext"

function Table({
    columns,
    children
}) {

    const { colors} = useTheme();
    
    return(
        <div
            className="overflow-x-auto"
        >
            <table
                className="w-full"
            >

                <thead>

                    <tr>

                        {
                            columns.map(
                                (column) => (
                                    <th
                                        key={column}
                                        style={{ color: colors.text }}
                                        className="text-left px-6 py-4"
                                    >
                                        {column}
                                    </th>
                                )
                            )
                        }

                    </tr>

                </thead>

                <tbody>

                    {children}

                </tbody>

            </table>
        </div>
    );
}

export default Table;