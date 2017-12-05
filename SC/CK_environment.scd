// CodeKlavier Environment

~stopall = Environment[
  'now' -> {|self|
"stopping".postln;
~hello.stop;
~hello2.stop;
~hello3.stop;
~ost.stop;
~ost1.stop;
~ost2.stop;
}
];

~stopall.know = true;
