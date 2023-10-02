using System;
using System.Runtime.InteropServices.JavaScript;
using RegExp = Lucene.Net.Util.Automaton.RegExp;
using RegExpSyntax = Lucene.Net.Util.Automaton.RegExpSyntax;
using Automaton = Lucene.Net.Util.Automaton.Automaton;
using CharacterRunAutomaton = Lucene.Net.Util.Automaton.CharacterRunAutomaton;
using System.Collections.Generic;

// Disable warnings since we want a no-op and only want to export code for JS to use
#pragma warning disable CS7022
#pragma warning disable CS8321
#pragma warning disable CA1416
static void Main() { }

public partial class LuckyRegexClass
{
    [JSExport]
    internal static bool Test(string regexStr, string testString, string flags)
    {
        Enum.TryParse(flags, out RegExpSyntax syntax);
        RegExp re = new RegExp(regexStr, syntax);
        Automaton auto = re.ToAutomaton();
        CharacterRunAutomaton run = new CharacterRunAutomaton(auto);
        bool result = run.Run(testString);
        return result;
    }
}
